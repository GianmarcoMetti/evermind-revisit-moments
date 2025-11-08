export type Person = {
  id: string;
  name: string;
  relationshipToUser: string;
  avatar?: string;
};

export type MemoryPost = {
  id: string;
  title: string;
  date: string;
  location?: string;
  media: {
    url: string;
    aspect?: 'portrait' | 'landscape' | 'square';
  };
  people: Person[];
  story: string;
  postedBy: {
    name: string;
    relationship: string;
  };
  category: MomentCategory;
  coordinates?: { lat: number; lng: number };
};

export type Reminder = {
  id: string;
  text: string;
  time: string;
  active: boolean;
  createdBy: {
    name: string;
    relationship: string;
  };
};

export type Message = {
  id: string;
  from: string;
  relationship: string;
  content: string;
  date: string;
  usedForMemory?: boolean;
  usedForReminder?: boolean;
};

export type FilterType = 'all' | 'people' | 'moments' | 'map';

export type MomentCategory = 'family' | 'travel' | 'school' | 'celebrations' | 'work' | 'hobby' | 'romance' | 'food';
