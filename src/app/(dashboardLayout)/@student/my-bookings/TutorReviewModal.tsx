"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, { useState } from "react";
import { Star } from "lucide-react";
import { ReviewModalProps } from "@/types/booking.types";
import { toast } from "sonner";
import { postReviewAction } from "./ReviewAction";

const TutorReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, bookingId }) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const reviewData = {
                comment: comment,
                rating: rating,
            };
            await postReviewAction(reviewData, bookingId);

            toast.success(`Thank you ${comment}! You have given ${rating} star review.`);

            onClose();
        } catch (error) {
            toast.error("There was an error posting your review. Please try again.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Tutor Review Here"
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="flex flex-col items-center justify-center space-y-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Share Your Experiance?
                    </p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none transition-transform hover:scale-110"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <Star
                                    size={32}
                                    className={`${star <= (hover || rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                        } transition-colors duration-200`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Write a Comment (Optional)
                    </label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your valuable feedback..."
                        className="w-full px-4 py-3 border focus:border-orange-500 dark:border-orange-600 rounded-xl border-orange-500 dark:bg-zinc-900 dark:text-gray-100 resize-none transition-all"
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="secondary"
                        className="rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="default"
                        className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-6"
                        disabled={rating === 0}
                    >
                        Submit Review
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TutorReviewModal;