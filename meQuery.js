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
        return collection
    }

    collection.on = (event, callback) =>
    {
        collection.forEach(element => element.addEventListener(event, callback))
        return collection
    }

    collection.each = (callback) =>
    {
        let i = 0
        for (; i < collection.length; i++)
        {
            if (callback.call(collection[i], i, collection[i]) === false) break
        }
        return collection
    }

    collection.html = (arg) =>
    {
        if (typeof arg === 'string') collection.forEach(element => element.innerHTML = arg)
        if (typeof arg === 'undefined') return collection[0].innerHTML
        if (typeof arg === 'function')
        {
            const callback = arg
            let i = 0
            for (element of collection)
            {
                const oldHTML = element.innerHTML
                element.innerHTML = ''
                element.innerHTML = callback.call(element, i, oldHTML)
                i++
            }
        }
        return collection
    }

    collection.addClass = (arg) =>
    {
        let classNames
        if (typeof arg === 'string') classNames = arg
        else if (arg.length) classNames = arg.join(' ')
        collection.forEach(element => element.classList.value = classNames + element.classList.value)
        return collection
    }

    collection.removeClass = function (arg)
    {
        let classNames
        if (typeof arg === 'function')
        {
            const callback = arg
            collection.forEach((element, i) => 
            {
                this.removeClass(callback.call(element, i, element.classList.value))
            })
        } else 
        {
            if (typeof arg === 'string') classNames = arg.split(' ')
            else if (arg.length) classNames = arg
            collection.forEach(element => classNames.forEach((className => element.classList.remove(className))))
        }
        
        
    }
    collection.removeClass = collection.removeClass.bind(collection)

    collection.hasClass = (className) =>
    {
        let hasClass = false
        collection.forEach(element => Array.from(element.classList).includes(className) ? hasClass = true : null)
        return hasClass
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

