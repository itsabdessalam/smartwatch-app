module.exports = {
  normalizeFields(fields) {
    if (["post", "product"].indexOf(fields.post_type) !== -1) {
      return {
        id: fields.ID || fields.id,
        title: fields.post_title,
        slug: fields.post_name,
        date: fields.post_date,
        content: fields.post_content,
        type: fields.post_type,
        status: fields.post_status,
        customFields: fields.custom_fields,
      };
    }
    return {};
  },
};
