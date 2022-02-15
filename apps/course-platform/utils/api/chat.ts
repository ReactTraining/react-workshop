import { db } from 'course-platform/utils/firebase'
import type { ChatMessage } from 'course-platform/utils/types'
import {
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  limit,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
} from 'firebase/firestore'

export async function postMessage(
  text: string,
  userId: number,
  user: string,
  avatarUrl: string | null
): Promise<void> {
  text = text.replace('angular is cool', 'react is cool')
  text = text.replace('javascript sucks', 'javascript is amazing')
  if (text.trim().toLowerCase() === 'clear') {
    // "clear" is a special chat message to delete all chats
    clear()
  } else {
    // const docRef = await addDoc(collection(db, 'chat'), {
    await addDoc(collection(db, 'chat'), {
      userId,
      user,
      text,
      created: Date.now(),
      avatarUrl: avatarUrl || '',
    })
    // return docRef.id // not used but maybe later
  }
}

export async function getMessages() {
  const q = query(collection(db, 'chat'), orderBy('created', 'asc'), limit(100))
  const querySnapshot = await getDocs(q)
  const messages: ChatMessage[] = []
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...doc.data() } as ChatMessage)
  })
  return messages
}

export function subscribe(createdAfter: number, cb: (m: ChatMessage[]) => void) {
  const q = query(
    collection(db, 'chat'),
    where('created', '>', createdAfter),
    orderBy('created', 'asc')
  )
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.size === 0) return
    const messages: ChatMessage[] = []
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as ChatMessage)
    })
    cb(messages)
  })
  return unsubscribe
}

async function clear() {
  const q = collection(db, 'chat')
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(async (d) => await deleteDoc(doc(db, 'chat', d.id)))
}
