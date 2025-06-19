import React, { useState } from 'react';
import { tempCategories, menuData } from '@/data/menu-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPage = () => {
  const [categories, setCategories] = useState(tempCategories);
  const [menu, setMenu] = useState(menuData);
  const [updatedJson, setUpdatedJson] = useState('');

  const handleSave = () => {
    const newMenuData = {
      tempCategories: categories,
      menuData: menu,
    };
    const jsonString = JSON.stringify(newMenuData, null, 2);
    setUpdatedJson(`// Copy this content and replace the content of src/data/menu-data.ts

export const tempCategories = ${JSON.stringify(categories, null, 2)};

export const menuData = ${JSON.stringify(menu, null, 2)};
`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.map((category, index) => (
            <div key={category.id} className="flex items-center gap-2 mb-2">
              <Input
                value={category.name}
                onChange={(e) => {
                  const newCategories = [...categories];
                  newCategories[index].name = e.target.value;
                  setCategories(newCategories);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.map(category => (
            <div key={category.id} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              {menu[category.id as keyof typeof menu]?.map((item, itemIndex) => (
                <div key={itemIndex} className="grid grid-cols-3 gap-2 mb-2">
                  <Input 
                    value={item.name}
                    onChange={(e) => {
                        const newMenu = {...menu};
                        newMenu[category.id as keyof typeof menu][itemIndex].name = e.target.value;
                        setMenu(newMenu);
                    }}
                  />
                  <Input
                    value={item.price}
                    onChange={(e) => {
                        const newMenu = {...menu};
                        newMenu[category.id as keyof typeof menu][itemIndex].price = e.target.value;
                        setMenu(newMenu);
                    }}
                  />
                   <Input
                    value={item.image}
                    onChange={(e) => {
                        const newMenu = {...menu};
                        newMenu[category.id as keyof typeof menu][itemIndex].image = e.target.value;
                        setMenu(newMenu);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Button onClick={handleSave}>Generate Updated Data</Button>
      </div>

      {updatedJson && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Updated Data</h2>
          <p>Copy the content below and paste it into <pre>src/data/menu-data.ts</pre></p>
          <Textarea value={updatedJson} rows={20} readOnly />
        </div>
      )}
    </div>
  );
};

export default AdminPage; 