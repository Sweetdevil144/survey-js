export const surveyParser = async (data) => {
  const processData = async (item) => {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (item.type === 'checkbox' && item.name === 'top_leaders' && item.api) {
            await fetchLeaders(item);
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


const fetchLeaders = async (item) => {
  try {
    const res = await fetch(item.api);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    const { leaders } = await res.json();
    item.choices = leaders.map((leader) => {
      return {
        value: leader.name,
        text: `<img src="${leader.imageUrl}" alt="${leader.name}" style="border-radius: 50%; width: 30px; height: 30px;" /> ${leader.name}`
      };
    });
    delete item.api;
  } catch (error) {
    console.error('Error fetching leaders:', error);
  }
};
