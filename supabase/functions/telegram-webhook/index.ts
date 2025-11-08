import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TelegramUpdate {
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
    caption?: string;
    photo?: Array<{
      file_id: string;
      file_unique_id: string;
      file_size: number;
      width: number;
      height: number;
    }>;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!telegramBotToken) {
      throw new Error('TELEGRAM_BOT_TOKEN not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const update: TelegramUpdate = await req.json();

    console.log('Received Telegram update:', JSON.stringify(update, null, 2));

    const message = update.message;
    if (!message) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const telegramUserId = message.from.id.toString();
    const senderName = `${message.from.first_name}${message.from.last_name ? ' ' + message.from.last_name : ''}`;
    const chatId = message.chat.id;
    
    // Get message content
    const messageText = message.text || message.caption || '';
    
    // Get photo URL if present
    let photoUrl = null;
    if (message.photo && message.photo.length > 0) {
      const largestPhoto = message.photo[message.photo.length - 1];
      const fileResponse = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/getFile?file_id=${largestPhoto.file_id}`
      );
      const fileData = await fileResponse.json();
      if (fileData.ok) {
        photoUrl = `https://api.telegram.org/file/bot${telegramBotToken}/${fileData.result.file_path}`;
      }
    }

    // Parse the message to extract memory details using AI
    // If there's a photo, use GPT-4o with vision to analyze and create a rich memory
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    
    let aiResponse;
    if (photoUrl && openAIApiKey) {
      // Use GPT-4o with vision for images
      aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a compassionate assistant helping create meaningful memories. Analyze the image and message to create a beautiful memory description.
Extract:
- title: A warm, descriptive title (2-5 words)
- relationship: The sender's relationship (e.g., "daughter", "son", "grandson")
- story: Rewrite the message as a heartfelt memory story, incorporating what you see in the image. Describe the scene, emotions, and significance. Make it personal and touching.
- location: Extract any location mentioned
- category: One of: family, travel, school, celebrations, work, hobby, romance, food
- people: Extract people mentioned with their names and relationships

Return only JSON: { 
  "title": "", 
  "relationship": "", 
  "story": "", 
  "location": "", 
  "category": "",
  "people": [{"name": "", "relationship": ""}]
}`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: messageText || 'Please describe this memory'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: photoUrl
                  }
                }
              ]
            }
          ],
          max_tokens: 500,
        }),
      });
    } else {
      // Use Lovable AI for text-only messages
      aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: `You are a helpful assistant that extracts structured memory information from messages. 
Extract a title (short, 2-5 words), relationship of the sender (e.g., "daughter", "son", "grandson"), and a story (the full message content).
If a location is mentioned, extract it. Categorize as one of: family, travel, school, celebrations, work, hobby, romance, food.
Extract people mentioned in the memory with their names and relationships to the main person (e.g., "Mom", "Dad", "Anna", "Michael").
Return JSON: { 
  "title": "", 
  "relationship": "", 
  "story": "", 
  "location": "", 
  "category": "",
  "people": [{"name": "", "relationship": ""}]
}`
            },
            {
              role: 'user',
              content: messageText || 'A shared photo memory'
            }
          ],
          max_completion_tokens: 500,
        }),
      });
    }

    const aiData = await aiResponse.json();
    let aiContent = aiData.choices?.[0]?.message?.content || '{}';
    
    // Strip markdown code blocks if present
    aiContent = aiContent.trim();
    if (aiContent.startsWith('```json')) {
      aiContent = aiContent.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (aiContent.startsWith('```')) {
      aiContent = aiContent.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    let memoryData;
    try {
      memoryData = JSON.parse(aiContent);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      console.error('AI Content was:', aiContent);
      memoryData = {
        title: messageText.substring(0, 50) || 'New Memory',
        relationship: 'family member',
        story: messageText || 'A shared memory',
        location: null,
        category: 'family'
      };
    }

    // Insert memory into database
    const { data, error } = await supabase
      .from('memories')
      .insert({
        telegram_user_id: telegramUserId,
        created_by_name: senderName,
        created_by_relationship: memoryData.relationship || 'family member',
        title: memoryData.title || 'New Memory',
        story: memoryData.story || messageText || 'A shared memory',
        location: memoryData.location || null,
        media_url: photoUrl,
        category: memoryData.category || 'family',
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting memory:', error);
      throw error;
    }

    console.log('Memory created:', data);

    // Process people if extracted by AI
    if (memoryData.people && Array.isArray(memoryData.people) && memoryData.people.length > 0) {
      for (const person of memoryData.people) {
        // Use relationship as name if name is not available
        const personName = person.name || person.relationship || 'family member';
        const personRelationship = person.relationship || 'family member';

        // Check if person exists
        const { data: existingPerson } = await supabase
          .from('people')
          .select('id')
          .eq('name', personName)
          .maybeSingle();

        let personId;

        if (existingPerson) {
          personId = existingPerson.id;
        } else {
          // Create new person
          const { data: newPerson, error: personError } = await supabase
            .from('people')
            .insert({
              name: personName,
              relationship_to_user: personRelationship,
            })
            .select('id')
            .single();

          if (personError) {
            console.error('Error creating person:', personError);
            continue;
          }

          personId = newPerson.id;
          console.log('Created new person:', personName);
        }

        // Link person to memory
        const { error: linkError } = await supabase
          .from('memory_people')
          .insert({
            memory_id: data.id,
            person_id: personId,
          });

        if (linkError) {
          console.error('Error linking person to memory:', linkError);
        } else {
          console.log('Linked person to memory:', person.name);
        }
      }
    }

    // Send confirmation to Telegram user
    await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ Memory saved! "${memoryData.title}"\n\nThis memory will be shared with everyone in EverMind. 💙`,
      }),
    });

    return new Response(JSON.stringify({ ok: true, memory: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in telegram-webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});