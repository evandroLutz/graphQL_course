const product = {
    priceWithDiscount: (parent) => {
      if (parent.discount) {
        return parent.price * (1 - parent.discount);
      }
    },
}

export default product;