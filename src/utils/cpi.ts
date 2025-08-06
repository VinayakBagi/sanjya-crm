export const generateUniqueID = async (sequenceName: string) => {
  // Get the next value from PostgreSQL sequence
  const q: string = `SELECT nextval('${sequenceName}')`;
  const result = await strapi.db.connection.raw(q);
  const nextNumber = result.rows[0].nextval;

  // pad with zeros
  return `${String(nextNumber).padStart(9, "0")}`;
};
