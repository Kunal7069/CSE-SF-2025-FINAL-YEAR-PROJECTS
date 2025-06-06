import Review from '../models/review.model.js';
import Service from '../models/service.model.js';

// ----------------------------
// Add a review by a logged-in expert
// ----------------------------
export const addReview = async (req, res) => {
  try {
    const expertId = req.expert._id;
    const { serviceId, rating, comment } = req.body;

    const existing = await Review.findOne({ expert: expertId, service: serviceId });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this service.' });
    }

    const review = await Review.create({
      expert: expertId,
      service: serviceId,
      rating,
      comment,
    });

    await Service.findByIdAndUpdate(serviceId, {
      $push: { reviews: review._id }
    });

    const reviews = await Review.find({ service: serviceId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Service.findByIdAndUpdate(serviceId, { rating: avgRating });

    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// Get all reviews for a service
// ----------------------------
export const getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.find({ service: serviceId })
      .populate('expert', 'name aboutMe photo ')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// Delete a review by the logged-in expert
// ----------------------------
export const deleteReview = async (req, res) => {
  try {
    const expertId = req.expert._id;
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (review.expert.toString() !== expertId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this review.' });
    }

    await Review.findByIdAndDelete(reviewId);

    await Service.findByIdAndUpdate(review.service, {
      $pull: { reviews: review._id }
    });

    const remainingReviews = await Review.find({ service: review.service });
    const avgRating = remainingReviews.length
      ? remainingReviews.reduce((sum, r) => sum + r.rating, 0) / remainingReviews.length
      : 0;

    await Service.findByIdAndUpdate(review.service, { rating: avgRating });

    res.status(200).json({ message: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
