const normalizeFields = (fields) => {
  const type = fields.post_type;
  let target;
  switch (type) {
    case "post":
      return {
        id: fields.ID || fields.id,
        title: fields.post_title,
        slug: fields.post_name,
        date: fields.post_date,
        content: fields.post_content,
        type: fields.post_type,
        status: fields.post_status,
        image: fields.custom_fields.image,
      };
    case "product":
      return {
        id: fields.ID || fields.id,
        title: fields.post_title,
        slug: fields.post_name,
        date: fields.post_date,
        content: fields.post_content,
        type: fields.post_type,
        status: fields.post_status,
        image: fields.custom_fields.image,
        description: fields.custom_fields.description,
        sku: fields.custom_fields.sku,
        price: fields.custom_fields.price,
        color: fields.custom_fields.color,
        brand: {
          name: fields.custom_fields.brand.post_title,
          slug: fields.custom_fields.brand.post_name,
        },
      };
    default:
      return {};
  }
};

module.exports = {
  normalizeFields,
};
