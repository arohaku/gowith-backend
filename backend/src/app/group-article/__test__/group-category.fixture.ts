import { GroupCategory } from '@app/group-article/entity/group-category.entity';

export const getGroupCategoryFixture = () => {
  const categories = ['MEAL', 'WORKING', 'ETC', 'COMPETITION', 'HOLIDAY'];
  return categories.map((category, index) => {
    const fixture = new GroupCategory();
    fixture.id = index + 1;
    fixture.name = category;
    fixture.createdAt = new Date();
    fixture.updatedAt = new Date();
    return fixture;
  });
};
