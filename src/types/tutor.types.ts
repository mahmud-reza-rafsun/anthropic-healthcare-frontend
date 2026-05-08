export interface TutorProps {
    tutor: {
        id: string;
        categoryName: string;
        bio: string;
        hourlyRate: number;
        subject: string[];
        availability: {
            [key: string]: string[];
        };
    };
}