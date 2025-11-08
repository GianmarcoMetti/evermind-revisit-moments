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
};

export type Reminder = {
  id: string;
  text: string;
  time: string;
  active: boolean;
};

export type FilterType = 'all' | 'people' | 'moments' | 'map';
