import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(), // ✅ ensure getBaseUrl returns your backend API base (e.g., http://localhost:5000/api/reviews)
    credentials: 'include',
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    // ✅ Post or update review
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: '/post-review',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Reviews', id: productId },
      ],
    }),

    // ✅ Get total review count
    getReviewsCount: builder.query({
      query: () => ({
        url: '/total-reviews',
      }),
    }),

    // ✅ Get reviews by user ID
    getReviewsByUserId: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`, // ✅ ensure your backend route matches
      }),
      providesTags: (result) =>
        result
          ? result.map((review) => ({
              type: 'Reviews',
              id: review.productId,
            }))
          : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
