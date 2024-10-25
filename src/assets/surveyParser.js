export const surveyParser = async (data) => {
  const processData = async (item) => {
    if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (item.name === 'top_leaders') {
            await fetchLeaders(item);
          } else if (item.useType === 'emoji') {
            await fetchEmojis(item);
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
        text: `![${leader.name}](${leader.imageUrl})`
      };
    });
    delete item.api;
  } catch (error) {
    console.error('Error fetching leaders:', error);
  }
};

const fetchEmojis = async (item) => {
  try {
    const res = await fetch(item.api);
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    const { emojis } = await res.json();
    item.rateValues = emojis.map((emoji, index) => ({
      value: index + 1,
      text : `<img src="${emoji.imageUrl}" alt="${emoji.name}" class="emoji_image" style="height: 42px; width: 42px;" />`
    }));
    delete item.useType;
    delete item.api;
  } catch (error) {
    console.error('Error fetching emojis:', error);
  }
};
