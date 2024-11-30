package org.e2e.review.dto;

import lombok.Data;

@Data
public class NewReviewDto {
    private String comment;
    private Integer rating;
    private Long rideId;
    private Long targetId;
}
