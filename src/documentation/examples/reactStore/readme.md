## What is this react store pattern ?

This is a store pattern created for managing stores at any level of the application.
Once we decide to desing a store that will supply usefull states and uttility functions
to the child and sibling components from a parent we should use this pattern.

The `index` exposes the context that creates a  wraper as the store. The `useConsumer` hook exposes 
all the api supplied from this store. `useStore` is the main store that holds business logics. There is another folder created to split the codes and keep `useStore` hook clean. Any logically relevat state or data to this store and logically realted data and functions can create any useful hook. We create hooks as we need and expose them from store. 

> cautions: Hooks from `hooks` folder are not recomended to call or directly utilise in a compoent. This will be considered as a bad practice. These are only developed tto be exposed from this store as in an excapsulated form.

Example how can component maybe utilising a store created by this patter.

```js
import { CachedDataStoreProvider } from "storepath"

function MyAmazingCompoent(){
    return (
        <CachedDataStoreProvider>
            <ChildContentOfMyAmazingCompoent/>
        </CachedDataStoreProvider>
    )
}
```
How childs all valus

```js
import { useCachedDataHook } from "storepath"

function ChildContentOfMyAmazingCompoent(){
    const { getCachdData } = useCachedDataHook()
    /** somehow control ui with tha apis exposed from the hook. */
    return <>render ui</>
}
```

and this process can go on at any depth because all child and siblings are wrapped with `CachedDataStoreProvider`