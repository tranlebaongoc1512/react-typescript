import React, { useState, ChangeEvent } from 'react';
import { Container, Typography, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useTheme from './hooks/useTheme';


export default function About() {
    const { theme } = useTheme();
    const [value, setValue] = useState('1');

    const handleChange = (event: ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="md" className='component-container'>
            <Typography variant="h4" gutterBottom>About Us</Typography>
            <Typography variant="body1" paragraph>
                Welcome to our film website! We are passionate about movies and are dedicated to providing you with the latest
                information, reviews, and updates from the world of cinema.
            </Typography>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab sx={{ color: theme.color }} label="WHO WE ARE" value="1" />
                        <Tab sx={{ color: theme.color }} label="OUR PURPOSE" value="2" />
                        <Tab sx={{ color: theme.color }} label="WHAT WE OFFER" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Typography variant="body1" paragraph>
                        At our core, we are avid film lovers with a deep appreciation for the art of storytelling through motion pictures. We believe that films have the power to entertain, inspire, educate, and connect people from all walks of life. Our team consists of dedicated individuals who share a common goal: to share our love for films and provide a space for others to engage with this captivating medium.
                    </Typography>
                </TabPanel>
                <TabPanel value="2">
                    <Typography variant="body1" paragraph>
                        Our primary objective is to serve as a comprehensive resource for all things related to films. We aim to offer a platform that caters to both casual movie enthusiasts and serious cinephiles alike. Whether you are looking for recommendations, in-depth film analysis, or simply want to stay up-to-date with the latest movie news, we've got you covered.
                    </Typography>
                </TabPanel>
                <TabPanel value="3">
                    <ul>
                        <li>
                            <Typography variant="body1">
                                Film Reviews and Recommendations: Our team of experienced writers provides insightful reviews and recommendations to help you make informed decisions about which movies to watch. From mainstream blockbusters to independent gems, we strive to cover a wide range of genres and styles.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Thought-Provoking Analysis: We delve deeper into the world of cinema by offering thought-provoking analysis and discussions on various films, directors, and trends. Our aim is to foster a deeper understanding and appreciation of the artistry behind filmmaking.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Engaging Community: We believe that films are meant to be shared and discussed. Through our website, we provide a platform for film enthusiasts to connect with one another, share their thoughts, and engage in meaningful conversations. Join our vibrant community and be a part of the ongoing film dialogue.
                            </Typography>
                        </li>
                    </ul>
                </TabPanel>
            </TabContext>
            <Typography variant="body1" paragraph>
                We hope you enjoy exploring our website and find it to be a valuable resource for all things related to movies.
                If you have any questions, suggestions, or feedback, please don't hesitate to contact us. Happy movie-watching!
            </Typography>
        </Container>
    )
}

