export default {
  actions: {
    delete: 'Delete Review',
    edit: 'Edit Review',
  },
  byUser: 'Reviews by {{username}} ({{count}})',
  count: 'Reviews ({{count}})',
  create: {
    error: 'Failed to create review',
    submit: 'Write Review',
    success: 'Review created',
  },
  delete: {
    description:
      'Are you sure you want to delete this review? This action cannot be undone.',
    error: 'Failed to delete review',
    success: 'Review deleted',
    title: 'Delete Review',
  },
  emptyByUser: "{{username}} hasn't written any reviews yet.",
  emptyDescription: 'Share your thoughts and help others discover great ideas.',
  emptyMine:
    "You haven't written any reviews yet. Explore ideas and share your feedback!",
  emptyTitle: 'No reviews yet. Be the first to review this idea!',
  form: {
    content: 'Review',
    contentPlaceholder: 'Write your review here...',
    editDescription: 'Update your review for this idea',
    editTitle: 'Edit Review',
    rating: 'Rating',
    reviewFor: 'Review for:',
    submit: 'Submit Review',
    writeDescription: 'Share your thoughts about this idea',
    writeTitle: 'Write Review',
  },
  mine: {
    description: "View and manage all reviews you've written",
    kicker: 'Feedback',
    metaDescription:
      "View and manage all reviews you've written for AI application ideas",
    metaTitle: 'My Reviews | AIdeas',
    title: 'My Reviews',
  },
  updated: 'Review updated',
};
