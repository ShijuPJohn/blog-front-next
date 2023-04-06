import styles from './page.module.css'
import PostCard from "@/app/post_card/post_card";
import {useRouter} from "next/navigation";

async function getPosts() {
    const response = await fetch('http://localhost:8080/api/posts',{ cache: 'no-store' });
    if (!response.ok) {
        throw new Error('fetch error');
    }
    return await response.json();
}

export default async function Home() {
    const posts = await getPosts();
    console.log(posts)
    return (
        <main className={styles.main}>
            {posts && posts.map(post => (
                <PostCard post={post} createdDate={(new Date(post.time_created)).toLocaleDateString()} key={post.id}/>

            ))}
        </main>
    )
}
