package org.e2e.review.domain;

import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.exceptions.ResourceNotFoundException;
import org.e2e.review.dto.NewReviewDto;
import org.e2e.review.infrastructure.ReviewRepository;
import org.e2e.ride.domain.Ride;
import org.e2e.ride.infrastructure.RideRepository;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final BaseUserRepository<User> userRepository;

    private final RideRepository rideRepository;

    private final AuthorizationUtils authorizationUtils;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, BaseUserRepository<User> userRepository, RideRepository rideRepository, AuthorizationUtils authorizationUtils) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
        this.authorizationUtils = authorizationUtils;
    }

    public void createNewReview(NewReviewDto newReview) {
        String authorEmail= authorizationUtils.getCurrentUserEmail();

        Optional<? extends User> author = userRepository.findByEmail(authorEmail);
        Optional<? extends User> targetId = userRepository.findById(newReview.getTargetId());

        if (author.isEmpty() || targetId.isEmpty()) throw new ResourceNotFoundException("User not found");

        Ride ride = rideRepository
                .findById(newReview.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        Review review = new Review();
        review.setAuthor(author.get());
        review.setTarget(targetId.get());
        review.setRide(ride);
        review.setComment(newReview.getComment());
        review.setRating(newReview.getRating());


        reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        Review reviewToDelete = reviewRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException ("Review not found"));

        Long authorId = reviewToDelete.getAuthor().getId();

        if (!authorizationUtils.isAdminOrResourceOwner(authorId))
            throw new AccessDeniedException("User not authorized to modify this resource");

        reviewRepository.delete(reviewToDelete);
    }
}
