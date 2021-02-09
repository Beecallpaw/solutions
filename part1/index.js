const list = (xs) => {
  const names = xs.map(({ name }) => name).join(", ");
  const index = names.lastIndexOf(", ");
  if (index != -1) {
    return names.substring(0, index) + " &" + names.substring(index + 1);
  }
  return names;
};

module.exports = list;
