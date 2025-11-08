import { MemoryPost, Person, Reminder, Message } from './types';
import memoryBeach from '@/assets/memory-beach.jpg';
import memoryDinner from '@/assets/memory-dinner.jpg';
import memoryGarden from '@/assets/memory-garden.jpg';
import memoryBike from '@/assets/memory-bike.jpg';
import memoryLake from '@/assets/memory-lake.jpg';
import memoryCouple from '@/assets/memory-couple.jpg';
import memoryForest from '@/assets/memory-forest.jpg';
import memoryBirthday from '@/assets/memory-birthday.jpg';

export const people: Person[] = [
  { id: '1', name: 'Anna', relationshipToUser: 'daughter' },
  { id: '2', name: 'Michael', relationshipToUser: 'son' },
  { id: '3', name: 'Sarah', relationshipToUser: 'granddaughter' },
  { id: '4', name: 'Tom', relationshipToUser: 'friend' },
  { id: '5', name: 'Margaret', relationshipToUser: 'sister' },
];

export const memories: MemoryPost[] = [
  {
    id: '1',
    title: 'Sunset at the Beach',
    date: '2024-08-15',
    location: 'Ocean View Beach',
    media: { url: memoryBeach, aspect: 'landscape' },
    people: [people[0], people[2]],
    story: 'We spent the most beautiful evening watching the sunset together. The waves were gentle, and Sarah collected seashells while we talked about her school year. The sky turned the most incredible shades of pink and orange.',
    postedBy: { relationship: 'daughter' },
    category: 'travel',
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: '2',
    title: 'Family Dinner',
    date: '2024-11-01',
    location: 'Home',
    media: { url: memoryDinner, aspect: 'portrait' },
    people: [people[0], people[1], people[2]],
    story: 'The whole family gathered for Sunday dinner. We had your favorite roast chicken and talked for hours. Michael told us about his new job, and everyone laughed at the old stories you shared. It was such a warm, happy evening.',
    postedBy: { relationship: 'son' },
    category: 'family',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: '3',
    title: 'Spring Garden',
    date: '2024-04-20',
    location: 'Memorial Garden',
    media: { url: memoryGarden, aspect: 'square' },
    people: [people[4]],
    story: 'Margaret and I visited the beautiful spring garden. The cherry blossoms were in full bloom, and we sat on the bench under your favorite tree. We remembered all the times we used to visit together when we were young.',
    postedBy: { relationship: 'sister' },
    category: 'family',
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: '4',
    title: 'The Old Bicycle',
    date: '2024-07-10',
    location: 'Village Square',
    media: { url: memoryBike, aspect: 'portrait' },
    people: [people[3]],
    story: 'Tom found a bicycle just like the one you used to ride! He took this photo and wanted to share it with you. Remember all those rides through the countryside? Such wonderful memories.',
    postedBy: { relationship: 'friend' },
    category: 'hobby',
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
  {
    id: '5',
    title: 'Mountain Lake',
    date: '2024-09-05',
    location: 'Pine Lake',
    media: { url: memoryLake, aspect: 'landscape' },
    people: [people[1]],
    story: 'Michael went on a hiking trip and visited the lake we used to camp at. He said the place hasn\'t changed a bit and he could almost hear your voice teaching him how to fish. He wishes you could see how peaceful it still is.',
    postedBy: { relationship: 'son' },
    category: 'travel',
    coordinates: { lat: 47.6062, lng: -122.3321 },
  },
  {
    id: '6',
    title: 'Anniversary Photo',
    date: '2024-06-12',
    location: 'Photo Album',
    media: { url: memoryCouple, aspect: 'portrait' },
    people: [],
    story: 'Found this beautiful photo from your 50th wedding anniversary. The love and joy in your faces tells such a beautiful story. What an incredible journey you both shared together.',
    postedBy: { relationship: 'daughter' },
    category: 'romance',
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: '7',
    title: 'Autumn Walk',
    date: '2024-10-18',
    location: 'Maple Forest Trail',
    media: { url: memoryForest, aspect: 'square' },
    people: [people[0], people[2]],
    story: 'Sarah and I took a walk through the forest path you love so much. The autumn colors were breathtaking! Sarah said it reminded her of all the nature walks we used to take with you when she was little.',
    postedBy: { relationship: 'daughter' },
    category: 'family',
    coordinates: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: '8',
    title: 'Birthday Celebration',
    date: '2024-11-05',
    location: 'Home',
    media: { url: memoryBirthday, aspect: 'landscape' },
    people: [people[0], people[1], people[2]],
    story: 'We celebrated with your favorite chocolate cake! Everyone was here, and we all made wishes together. The house was filled with love, laughter, and so many happy memories. We missed having you blow out the candles with us.',
    postedBy: { relationship: 'daughter' },
    category: 'celebrations',
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
];

export const reminders: Reminder[] = [
  { 
    id: '1', 
    text: 'Take morning medication', 
    time: '8:00 AM', 
    active: true,
    createdBy: { relationship: 'daughter' }
  },
  { 
    id: '2', 
    text: 'Video call with Anna', 
    time: '2:00 PM', 
    active: true,
    createdBy: { relationship: 'daughter' }
  },
  { 
    id: '3', 
    text: 'Birthday for Sarah (her grandson)', 
    time: '3:00 PM', 
    active: true,
    createdBy: { relationship: 'daughter' }
  },
  { 
    id: '4', 
    text: 'Evening medication', 
    time: '7:00 PM', 
    active: true,
    createdBy: { relationship: 'son' }
  },
];

export const messages: Message[] = [
  {
    id: 'm1',
    from: 'Anna',
    relationship: 'daughter',
    content: 'Hi Mom! Here\'s a photo from the beach with Sarah last week.',
    date: '2024-08-16',
    usedForMemory: true,
  },
  {
    id: 'm2',
    from: 'Michael',
    relationship: 'son',
    content: 'Sharing the family dinner photos from Sunday!',
    date: '2024-11-02',
    usedForMemory: true,
  },
  {
    id: 'm3',
    from: 'Anna',
    relationship: 'daughter',
    content: 'Don\'t forget to take your medication at 8 AM and 7 PM daily.',
    date: '2024-11-01',
    usedForReminder: true,
  },
  {
    id: 'm4',
    from: 'Margaret',
    relationship: 'sister',
    content: 'Remember our walk in the spring garden? Such beautiful memories.',
    date: '2024-04-21',
    usedForMemory: true,
  },
  {
    id: 'm5',
    from: 'Anna',
    relationship: 'daughter',
    content: 'Reminder: Sarah\'s birthday is coming up next week!',
    date: '2024-11-03',
    usedForReminder: true,
  },
  {
    id: 'm6',
    from: 'Tom',
    relationship: 'friend',
    content: 'Found this old bicycle that looks just like yours!',
    date: '2024-07-11',
    usedForMemory: true,
  },
];
