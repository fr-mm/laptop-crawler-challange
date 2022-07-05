interface ReviewsProps {
  amount: number;
  stars: number;
}

export default class Reviews {
  readonly amount: number;
  readonly stars: number;

  constructor({ amount, stars }: ReviewsProps) {
    this.amount = amount;
    this.stars = stars;
  }
}
