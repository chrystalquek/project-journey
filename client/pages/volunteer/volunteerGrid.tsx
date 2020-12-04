import React from 'react';
import styles from '../../styles/volunteer.module.css';
import VolunteerCard from './volunteerCard';

export default function VolunteerGrid() {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridItem}>
        <VolunteerCard
          image="image1.png"
          title="Volunteering: Regular Session [Committed]"
          date="29th October 2020"
          time="2.30pm - 6.00pm"
        />
      </div>
      <div className={styles.gridItem}>
        <VolunteerCard
          image="image2.png"
          title="Hangout: Chill Session at BIAB HQ"
          date="31st October 2020"
          time="5.00pm - 7.00pm"
        />
      </div>
      <div className={styles.gridItem}>
        <VolunteerCard
          image="image3.png"
          title="Workshop: Facilitating 101 with Ruth Lim"
          date="8th November 2020"
          time="12.00pm - 5.00pm"
        />
      </div>
      <div className={styles.gridItem}>
        <VolunteerCard
          image="image3.png"
          title="Workshop: Facilitating 101 with Ruth Lim"
          date="10th November 2020"
          time="2.30pm - 6.00pm"
        />
      </div>
    </div>
  );
}
