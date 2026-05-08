export interface BookingModalProps {
    tutor: any;
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