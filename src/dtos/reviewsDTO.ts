interface ReviewsDTOProps {
  amount: number;
  starts: number;
}

export default class ReviewsDTO {
  readonly amount: number;
  readonly starts: number;

  constructor({ amount, starts }: ReviewsDTOProps) {
    this.amount = amount;
    this.starts = starts;
  }
}
