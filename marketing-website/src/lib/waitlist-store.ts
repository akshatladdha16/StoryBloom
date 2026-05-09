type WaitlistEntry = {
  email: string;
  childName?: string;
  childAge?: string;
  interests?: string;
  personalized?: boolean;
  createdAt: string;
};

type WaitlistStore = {
  count: number;
  entries: WaitlistEntry[];
};

declare global {
  // eslint-disable-next-line no-var
  var __storybloomWaitlist: WaitlistStore | undefined;
}

const initialStore: WaitlistStore = {
  count: 2,
  entries: [],
};

const store = global.__storybloomWaitlist ?? initialStore;

if (!global.__storybloomWaitlist) {
  global.__storybloomWaitlist = store;
}

export function getWaitlistCount() {
  return store.count;
}

export function addWaitlistEntry(entry: WaitlistEntry) {
  store.entries.push(entry);
  store.count += 1;
}
