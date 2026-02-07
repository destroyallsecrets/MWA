import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentDir = path.join(process.cwd(), 'src', 'components', 'ui');
const componentPath = path.join(componentDir, `${componentName}.tsx`);

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const template = `import React from 'react';

interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};
`;

fs.writeFileSync(componentPath, template);
console.log(`Component ${componentName} created successfully at ${componentPath}`);