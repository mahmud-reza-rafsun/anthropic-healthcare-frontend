export interface BookingModalProps {
    doctor: any;
    isOpen: boolean;
    onClose: () => void;
}

export interface BookingCardProps {
    booking: {
        _id: string;
        status: string;
        totalAmmount: number;
        startTime: string;
        endTime: string;
        tutor: {
            categoryName: string;
            bio: string,
            hourlyRate: number
            subject: []
        };
    };
}

export interface Doctor {
    id: number;
    name: string;
    role: string;
    email: string;
    profile: string;
    subject: string;
    user: {
        name: string;
        email: string;
        image: string;
    }
}