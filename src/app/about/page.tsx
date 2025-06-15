
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/app/(components)/ui/button';
import SharedButton from '@/app/(components)/shared/SharedButton';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';
import styles from './about.module.css';
import Image from 'next/image';
// بيانات فريق العمل
const teamMembers = [
  {
    name: 'Omar Elsharkawy',
    role: 'Frontend Developer',
    linkedin: 'https://www.linkedin.com/in/omar-elsharkawii-6b9942238/',
    image: '/omar.png'
  },
  {
    name: 'Ali Mohamed',
    role: 'Backend Developer',
    linkedin: 'https://www.linkedin.com/in/ali-mohamed-68a0a3239/',
    image: '/Ali.jpeg'
  },
  {
    name: 'Nada Ahmed',
    role: '.NET Developer',
    linkedin: 'https://www.linkedin.com/in/nada-ahmed-dotnetdeveloper5219/',
    image: '/Nada.jpeg'
  },
  {
    name: 'Anas Magdy',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/anas-magdy/',
    image: '/Anas.jpeg'
  },
  {
    name: 'Abdelrahim Fathy',
    role: 'UI/UX Designer',
    linkedin: 'https://www.linkedin.com/in/abdelrahim-fathy-376736215/',
    image: '/Abdo.jpeg'
  },
  {
    name: 'Ahmed Ashraf',
    role: 'DevOps Engineer',
    linkedin: 'https://www.linkedin.com/in/ahmedashrraf/',
    image: '/Ahmed.jpeg'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

const cardVariants = {
  hover: {
    y: -10,
    transition: {
      duration: 0.3
    }
  }
};

export default function About() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={styles.aboutContainer}
    >
      <div className="max-w-6xl mx-auto">
        <motion.section variants={itemVariants} className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${styles.title} ${styles.gradientText}`}
          >
            About GameHub
          </motion.h1>

          <motion.div variants={itemVariants} className={styles.prose}>
            <p>
              GameHub is your ultimate destination for discovering and exploring
              thousands of free-to-play games from around the world. Powered by the{" "}
              <span className="font-semibold text-primary">FreeToGame API</span>, we bring you the most comprehensive and up-to-date gaming database.
            </p>
            <p>
              Our platform allows you to browse games by category, platform, and
              popularity. Whether you&apos;re looking for the latest MMORPG, a
              thrilling shooter, or a casual puzzle game, GameHub has you
              covered.
            </p>
            <p>
              All game data is sourced directly from{" "}
              <a
                href="https://www.freetogame.com/api-doc"
                className="text-primary hover:underline"
              >
                FreeToGame API
              </a>
              , ensuring accuracy and reliability.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Link href="/games">
              <SharedButton
                label="Explore Games"
                iconType="game"
                variant="secondary"
                size="lg"
                className="mx-auto"
              />
            </Link>
          </motion.div>
        </motion.section>

        {/* القسم الثاني: فريق العمل */}
        <motion.section variants={containerVariants} className="mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-8 text-center"
          >
            Meet Our Team
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  ...itemVariants,
                  hover: cardVariants.hover,
                }}
                whileHover="hover"
                className={styles.teamCard}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={styles.teamImage}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="rounded-full object-cover w-24 h-24"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`;
                      }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground mb-4">{member.role}</p>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* قسم الدعوة للعمل */}
        <motion.section variants={itemVariants} className={styles.ctaSection}>
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Ready to Explore Amazing Games?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mb-6 max-w-2xl mx-auto text-muted-foreground"
          >
            Discover thousands of free-to-play games and find your next favorite
            adventure.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/games">
              <Button
                variant="default"
                size="lg"
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                Browse All Games
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
