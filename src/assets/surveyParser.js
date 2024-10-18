export const surveyParser = async (data) => {
  const processData = async (item) => {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (item.type === 'checkbox' && item.api) {
            await fetchChoices(item);
          } else {
            await processData(item[key]);
          }
        }
      }
    } else if (Array.isArray(item)) {
      for (const subItem of item) {
        await processData(subItem);
      }
    }
  };

  const clonedData = JSON.parse(JSON.stringify(data));
  await processData(clonedData);
  return clonedData;
};

const fetchChoices = async (item) => {
  try {
    const res = await fetch(item.api);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    const { nameToAppend, valuesToAppend } = await res.json();
    item[nameToAppend] = valuesToAppend;
    delete item.api;
  } catch (error) {
    console.error('Error fetching choices:', error);
  }
};
