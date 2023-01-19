import { ContainerMemory } from "../Containers/ContainerMemory.js";
import { ContainerFilesystem } from "../Containers/ContainerFilesystem.js";

const DB_TYPE = "filesystem";
const PRODUCTS_FILENAME = "productos";
const ProductApi =
  DB_TYPE === "filesystem"
    ? new ContainerFilesystem(PRODUCTS_FILENAME)
    : new ContainerMemory();

export { ProductApi };