const normalizeFields = fields => {
  const type = fields.post_type;
  switch (type) {
    case 'post':
      return {
        id: fields.ID || fields.id,
        title: fields.post_title,
        slug: fields.post_name,
        date: fields.post_date,
        type: fields.post_type,
        status: fields.post_status,
        image: fields.custom_fields.image,
        content: fields.custom_fields.content,
      };
    case 'product':
      return {
        id: fields.ID || fields.id,
        name: fields.post_title,
        slug: fields.post_name,
        date: fields.post_date,
        type: fields.post_type,
        status: fields.post_status,
        image: fields.custom_fields.image,
        description: fields.custom_fields.description,
        sku: fields.custom_fields.sku,
        amount: parseFloat(fields.custom_fields.amount).toFixed(2),
        currency: fields.custom_fields.currency,
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
