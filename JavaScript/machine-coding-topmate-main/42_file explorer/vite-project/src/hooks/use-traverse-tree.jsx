const useTraverseTree = () => {
  // Function to insert a new node into the tree
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      // Inserting new item at the beginning of the items array
      tree.items.unshift({
        id: new Date().getTime(), // Unique ID for the new item
        name: item,
        isFolder: isFolder,
        items: [],
      });

      return tree;
    }

    // Recursively updating items in the tree
    let latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  // Placeholder functions for delete and rename operations
  const deleteNode = () => {}; // Function to delete a node (to be implemented)
  const renameNode = () => {}; // Function to rename a node (to be implemented)

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
