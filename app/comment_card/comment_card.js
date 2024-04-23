import React from 'react';
import styles from './page.module.css';

function CommentCard({comment}) {
    return (
        <div className={styles.comment_card_root_box}>
            <p className={styles.comment_card_author_name}>{comment.author_name}</p>
            <p className={styles.comment_card_comment}>{comment.comment}</p>
            <p className={styles.comment_card_time}>{(new Date(comment.time_created)).toLocaleString()}</p>
        </div>
    );
}

export default CommentCard;