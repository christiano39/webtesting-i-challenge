module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  return item.enhancement === 20
    ? { ...item }
    : { ...item, enhancement: item.enhancement + 1 };
}

function fail(item) {
  let durability = item.durability;
  let enhancement = item.enhancement;

  if (enhancement < 15 && durability <= 5) {
    durability = 0;
  } else if (enhancement < 15 && durability > 5) {
    durability -= 5;
  } else if (enhancement >= 15 && durability <= 10) {
    durability = 0;
  } else {
    durability -= 10;
  }

  if (enhancement > 16) {
    enhancement--;
  }

  return { ...item, durability, enhancement };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
