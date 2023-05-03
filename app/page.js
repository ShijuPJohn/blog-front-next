import styles from './page.module.css'
import PostCard from "@/app/post_card/post_card";
import {fetchURL} from "@/app/constants";
async function getPosts() {
    const response = await fetch(`${fetchURL}/posts`,{ cache: 'no-store' });
// ,{ cache: 'no-store' }
    if (!response.ok) {
        throw new Error('fetch error');
    }
    return await response.json();
}
export const metadata = {
    icons: {
        icon: '/favicon.png',
    },
    title:'ThinkPython'
};

export default async function Home() {
    const posts = await getPosts();
    return (
        <main className={styles.main}>
            {posts && posts.map(post => (
                <PostCard post={post} createdDate={(new Date(post.time_created)).toLocaleDateString()} key={post.id}/>

            ))}
        </main>
    )
}
