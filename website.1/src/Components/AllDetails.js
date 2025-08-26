import React from "react";
import ResumeUpload from "./Resume";
import Education from "./EducationSection";
import KeySkills from "./SkillsSection";
import Accomplishment from './Accomplishment';
import ITSkills from "./ITSkills";
import Project from "./ProjectsSection";
import Employment from "./Employment";
import PersonalDetails from "./PersonalDetailsSection";
import '../Styles/AllDetails.css';
const AllDetails = ({ onClose }) => {
    const sections = [
        {
            title: "Resume",
            component: <ResumeUpload onClose={onClose} />,
            gradient: "linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)"
        },
        {
            title: "Education",
            component: <Education onClose={onClose} />,
            gradient: "linear-gradient(135deg, #F97794 0%, #623AA2 100%)"
        },
        {
            title: "Key Skills",
            component: <KeySkills onClose={onClose} />,
                        gradient: "linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%)",
        },
        {
            title: "Accomplishment",
            component: <Accomplishment onClose={onClose} />,
            gradient: "linear-gradient(135deg, #cd8c74ff 0%, #ec5393ff 100%)"
        },
        {
            title: "IT Skills",
            component: <ITSkills onClose={onClose} />,
            gradient: "linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)"
        },
        {
            title: "Projects",
            component: <Project onClose={onClose} />,
            gradient: "linear-gradient(135deg, #d662e7ff 0%, #2c71e7ff 100%)"
        },
        {
            title: "Career Profile",
            component: <Employment onClose={onClose} />,
            gradient: "linear-gradient(135deg, #ed9696ff 0%, #FFAFBD 100%)"
        },
        {
            title: "Personal Details",
            component: <PersonalDetails onClose={onClose} />,
            gradient: "linear-gradient(135deg, #84e681ff 0%, #2376DD 100%)"
        }
    ];
    return (
        <div style={styles.container}>
            <h2 style={styles.mainHeading}>
                <span style={styles.headingHighlight}>Profile</span> Dashboard
            </h2>
            <div style={styles.gridContainer}>
                {sections.map((section, index) => (
                    <div key={index} style={styles.cardWrapper}>
                        <div style={styles.card(section.gradient)}>
                            <h3 style={styles.cardTitle}>{section.title}</h3>
                            <div style={styles.cardContent}>
                                {section.component}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const styles = {
    container: {
        padding: "24px 16px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "'Poppins', sans-serif",
        background: "radial-gradient(circle at 10% 20%, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 90%)",
    },
    mainHeading: {
        color: "#1E293B",
        fontSize: "32px",
        fontWeight: "800",
        marginBottom: "32px",
        textAlign: "center",
        letterSpacing: "-0.5px",
    },
    headingHighlight: {
        background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
    },
    gridContainer: {
        display: "grid",
        gap: "24px",
        '@media (max-width: 768px)': {
            gridTemplateColumns: "1fr",
            gap: "20px",
        },
    },
    cardWrapper: {
        perspective: "1000px",
    },
    card: (gradient) => ({
        background: gradient,
        borderRadius: "16px",
        padding: "2px",
        height: "100%",
        transformStyle: "preserve-3d",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        '@media (max-width: 768px)': {
            borderRadius: "12px",
        },
        '&:hover': {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 28px -5px rgba(0, 0, 0, 0.15)",
        },
    }),
    cardTitle: {
        color: "#fff",
        fontSize: "20px",
        fontWeight: "700",
        padding: "16px",
        margin: "0",
        textAlign: "center",
        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: "1",
        '@media (max-width: 768px)': {
            fontSize: "18px",
            padding: "14px",
        },
    },
    cardContent: {
        background: "#fff",
        borderRadius: "14px",
        padding: "20px",
        minHeight: "200px",
        boxShadow: "inset 0 4px 20px rgba(255, 255, 255, 0.3)",
        '@media (max-width: 768px)': {
            padding: "16px",
            borderRadius: "10px",
        },
    },
};
export default AllDetails;