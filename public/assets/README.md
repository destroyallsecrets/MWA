# Asset Management

This directory is the designated location for all static assets used in the MWA template.

## Structure

- **/models**: Store 3D models here (GLB, GLTF, FBX).
  - Recommended format: `.glb` (Draco compressed).
- **/textures**: Store texture maps and images here (JPG, PNG, WEBP).
- **/icons**: Store SVG icons or favicons here.

## Usage

Reference these assets in your code using the absolute path from the public root:
```tsx
useGLTF('/assets/models/my-model.glb')
```
