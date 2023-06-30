### What are these hooks?

Hooks in this folder are designed to  be only utilised in the application store for 
clean coding and code splitting. Although some of the hooks in the folder may work independently in different UI components these hooks are not recommended to call or 
directly utilise in a component. This will be considered as a bad practice.

All the useful functions are bundled and exposed from the store to the application. Also, this should not be populated with kinds of stuff that are not globally useful. Only globally useful 
functions variables and states are instructed to be used in this store. Hence any utility
hook in this folder can be created and exposed from the main store.