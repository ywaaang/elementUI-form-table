const Hoc = ({ component, name, ref }, fn) => {
    return {
        name,
        props: component.props,
        render(h) {
            const slots = Object.keys(this.$slots).reduce((arr, key) => {
                return arr.concat(this.$slots[key])
            }, []).map(vnode => {
                vnode.context = this._self
                return vnode
            })
            return h(component, {
                on: this.$listeners,
                props: this.$props,
                scopedSlots: this.scopedSlots,
                attrs: this.$attrs,
                ref
            }, slots)
        },
        mounted() {
            fn && fn()
        },

    }
}
export {
    Hoc
}