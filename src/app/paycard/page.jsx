'use client'

const TestPayCard = () => {

  return (
      <form action="https://mapaycard.com/epay/" method="POST">
        <input type="hidden" name="c" value="NzI3NTg0OTc"/>
        <input type="hidden" name="paycard-amount" value="1000"/>
        <input type="hidden" name="paycard-description" value="Vente de produit"/>
        <input type="hidden" name="order_id" value="abc001"/>
        <input type="submit" value="Payez"></input>
      </form>
  );
};

export default TestPayCard;
