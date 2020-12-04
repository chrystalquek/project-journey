import React from 'react';
import styles from '../../styles/volunteer.module.css';

type VolunteerCardProps = {
    image: string;
    title: string;
    date: string;
    time: string;
}

export default function VolunteerCard(props: VolunteerCardProps) {
  return (
    <div className={styles.card}>
      <img src={props.image} alt="Avatar" />
      <div className={styles.cardContainer}>
        <span><b>{props.title}</b></span>
        <span>{props.date}</span>
        <span>{props.time}</span>
        <a>&gt; View Details</a>
      </div>
    </div>
  );
}
