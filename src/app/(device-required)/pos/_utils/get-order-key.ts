const getOrderKey = (order: CustomOrder): string => {
  const options = order.menuOptionGroups
    .map((group) =>
      group.orderOptions
        .map((opt) => `${opt.name}:${opt.price}`)
        .sort()
        .join("|")
    )
    .sort()
    .join("||");

  return `${order.menuId}::${options}`;
};

export default getOrderKey;
