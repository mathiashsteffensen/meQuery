const isElement = (o) => 
{
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

const addCollectionExtras = (collection) =>
{
    collection.css = (...args) =>
    {
        if (typeof args[0] === 'object')
        {
            for (let cssProp in args[0])
            {
                collection.forEach((element) =>
                {
                    element.style[cssProp] = args[0][cssProp]
                })
            }
        } else if (typeof args[0] === 'string' && args[1])
        {
            const cssProp = args[0], value = args[1]
            collection.forEach((element) =>
            {
                element.style[cssProp] = value
            })
        } else if (typeof args[0] === 'string' && !args[1])
        {
            return collection[0].style[args[0]]
        }
    }

    collection.on = (event, callback) =>
    {
        collection.forEach(element => element.addEventListener(event, callback))
    }

    collection.each = (callback) =>
    {
        collection.forEach((element, i) => callback(i, element))
    }

    collection.addClass = (...args) =>
    {
        collection.forEach((element => args.flat().forEach(className => element.classList.add(className))))
    }

    return collection
}

const $ = (...args) =>
{
    if (typeof args[0] === 'function')
    {
        // handle on DOMContentLoaded callback function
        const callback = args[0]
        window.addEventListener('DOMContentLoaded', callback)
    } else if (typeof args[0] === 'string')
    {
        // Handle css selector
        const selector = args[0]
        const collection = addCollectionExtras(document.querySelectorAll(selector))

        return collection
    } else if (isElement(args[0]))
    {
        const collection = addCollectionExtras([args[0]])
        return collection
    }
}

