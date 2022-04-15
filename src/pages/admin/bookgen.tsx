import css from './bookgen.module.scss'
import { useState, useEffect, useRef } from 'react'
import { Previewer } from 'pagedjs'

export default function Bookgen() {
  const [session, setSession] = useState(null)
  const bookPreview = useRef()
  useEffect(() => {
    console.log('COUCOU')
    const previewer = new Previewer()
    previewer.preview(null, [' /book.css'], null).then((flow) => {
      console.log('preview rendered, total pages', flow.total, { flow })
      window.status = 'ready_to_print'
    })
  }, [])

  return (
    <div className="content">
      <div className="pdf-header"></div>
      <div className="pdf-footer">
        <div className="page-number-holder"></div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat
        ornare, feugiat dui non, molestie augue. Nullam sollicitudin iaculis
        massa eget dapibus. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Etiam a finibus lacus, convallis iaculis urna. Maecenas at
        luctus velit. Suspendisse condimentum tempor risus, nec eleifend neque
        tincidunt in. Mauris ut sodales turpis. Nam ultrices varius orci. Proin
        dui nibh, aliquet ut feugiat vel, tincidunt quis nisl. Duis fermentum,
        metus nec molestie vulputate, nunc purus dignissim velit, eu mattis
        massa justo congue purus. Cras egestas id leo quis vehicula. Quisque at
        odio elementum nulla hendrerit scelerisque. Vivamus rutrum nisl nec
        lectus facilisis iaculis. Etiam dignissim commodo sagittis. Ut eleifend
        varius tempor. Donec erat ligula, gravida ac porttitor et, feugiat nec
        elit. Etiam dignissim odio ac sapien mattis, ut dignissim quam
        pellentesque. Aenean pharetra tortor et leo placerat, eu imperdiet justo
        pellentesque. Nunc blandit ex erat, ac elementum orci malesuada commodo.
        Morbi pellentesque ex quis dolor tempor, a mattis augue eleifend. Fusce
        aliquet odio et libero laoreet, vel aliquam neque lacinia. Duis sit amet
        hendrerit enim, ac porta elit. Vestibulum vel semper nunc. Phasellus
        dapibus tempus ligula nec tincidunt. Mauris elit justo, sodales sed
        tellus quis, pulvinar ullamcorper est. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; In vitae
        porttitor risus. Donec quis lorem enim. Curabitur elementum venenatis
        nulla. Aenean eget imperdiet nibh. Phasellus mollis sit amet nulla et
        malesuada. Sed a enim diam. Aliquam eget sapien nec mauris pretium
        fringilla. Pellentesque convallis non ex eu bibendum. Sed ac tristique
        lacus. Mauris et suscipit eros. Nam pulvinar enim et interdum sagittis.
        Nulla consequat efficitur odio, a semper dolor. Morbi hendrerit dolor at
        leo viverra, a gravida purus egestas. Aliquam libero arcu, viverra
        eleifend tortor sit amet, blandit pulvinar ante. Integer justo metus,
        lobortis ut eros sed, dapibus cursus eros. In a rutrum mauris.
        Pellentesque mattis sapien mi, in consectetur nisi vestibulum in. Nulla
        tincidunt ornare nulla sit amet cursus. Etiam volutpat est et suscipit
        imperdiet. Duis commodo felis ante, sit amet varius eros interdum
        fringilla. Fusce ornare dui ut ullamcorper hendrerit. Quisque vehicula,
        eros sed scelerisque viverra, nibh ipsum consequat neque, in semper
        massa neque sit amet orci. Ut congue sapien eros, sed consectetur felis
        volutpat vitae. Nullam condimentum orci commodo nisi faucibus, at cursus
        magna cursus. Etiam lacinia tellus quis nisi vulputate porttitor. Duis a
        tincidunt enim. Donec in malesuada augue. Donec at eros ut dolor mattis
        tristique. Phasellus non fermentum velit, eu aliquam ex. Vestibulum
        suscipit dui sed lacinia dictum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat
        ornare, feugiat dui non, molestie augue. Nullam sollicitudin iaculis
        massa eget dapibus. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Etiam a finibus lacus, convallis iaculis urna. Maecenas at
        luctus velit. Suspendisse condimentum tempor risus, nec eleifend neque
        tincidunt in. Mauris ut sodales turpis. Nam ultrices varius orci. Proin
        dui nibh, aliquet ut feugiat vel, tincidunt quis nisl. Duis fermentum,
        metus nec molestie vulputate, nunc purus dignissim velit, eu mattis
        massa justo congue purus. Cras egestas id leo quis vehicula. Quisque at
        odio elementum nulla hendrerit scelerisque. Vivamus rutrum nisl nec
        lectus facilisis iaculis. Etiam dignissim commodo sagittis. Ut eleifend
        varius tempor. Donec erat ligula, gravida ac porttitor et, feugiat nec
        elit. Etiam dignissim odio ac sapien mattis, ut dignissim quam
        pellentesque. Aenean pharetra tortor et leo placerat, eu imperdiet justo
        pellentesque. Nunc blandit ex erat, ac elementum orci malesuada commodo.
        Morbi pellentesque ex quis dolor tempor, a mattis augue eleifend. Fusce
        aliquet odio et libero laoreet, vel aliquam neque lacinia. Duis sit amet
        hendrerit enim, ac porta elit. Vestibulum vel semper nunc. Phasellus
        dapibus tempus ligula nec tincidunt. Mauris elit justo, sodales sed
        tellus quis, pulvinar ullamcorper est. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; In vitae
        porttitor risus. Donec quis lorem enim. Curabitur elementum venenatis
        nulla. Aenean eget imperdiet nibh. Phasellus mollis sit amet nulla et
        malesuada. Sed a enim diam. Aliquam eget sapien nec mauris pretium
        fringilla. Pellentesque convallis non ex eu bibendum. Sed ac tristique
        lacus. Mauris et suscipit eros. Nam pulvinar enim et interdum sagittis.
        Nulla consequat efficitur odio, a semper dolor. Morbi hendrerit dolor at
        leo viverra, a gravida purus egestas. Aliquam libero arcu, viverra
        eleifend tortor sit amet, blandit pulvinar ante. Integer justo metus,
        lobortis ut eros sed, dapibus cursus eros. In a rutrum mauris.
        Pellentesque mattis sapien mi, in consectetur nisi vestibulum in. Nulla
        tincidunt ornare nulla sit amet cursus. Etiam volutpat est et suscipit
        imperdiet. Duis commodo felis ante, sit amet varius eros interdum
        fringilla. Fusce ornare dui ut ullamcorper hendrerit. Quisque vehicula,
        eros sed scelerisque viverra, nibh ipsum consequat neque, in semper
        massa neque sit amet orci. Ut congue sapien eros, sed consectetur felis
        volutpat vitae. Nullam condimentum orci commodo nisi faucibus, at cursus
        magna cursus. Etiam lacinia tellus quis nisi vulputate porttitor. Duis a
        tincidunt enim. Donec in malesuada augue. Donec at eros ut dolor mattis
        tristique. Phasellus non fermentum velit, eu aliquam ex. Vestibulum
        suscipit dui sed lacinia dictum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat
        ornare, feugiat dui non, molestie augue. Nullam sollicitudin iaculis
        massa eget dapibus. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Etiam a finibus lacus, convallis iaculis urna. Maecenas at
        luctus velit. Suspendisse condimentum tempor risus, nec eleifend neque
        tincidunt in. Mauris ut sodales turpis. Nam ultrices varius orci. Proin
        dui nibh, aliquet ut feugiat vel, tincidunt quis nisl. Duis fermentum,
        metus nec molestie vulputate, nunc purus dignissim velit, eu mattis
        massa justo congue purus. Cras egestas id leo quis vehicula. Quisque at
        odio elementum nulla hendrerit scelerisque. Vivamus rutrum nisl nec
        lectus facilisis iaculis. Etiam dignissim commodo sagittis. Ut eleifend
        varius tempor. Donec erat ligula, gravida ac porttitor et, feugiat nec
        elit. Etiam dignissim odio ac sapien mattis, ut dignissim quam
        pellentesque. Aenean pharetra tortor et leo placerat, eu imperdiet justo
        pellentesque. Nunc blandit ex erat, ac elementum orci malesuada commodo.
        Morbi pellentesque ex quis dolor tempor, a mattis augue eleifend. Fusce
        aliquet odio et libero laoreet, vel aliquam neque lacinia. Duis sit amet
        hendrerit enim, ac porta elit. Vestibulum vel semper nunc. Phasellus
        dapibus tempus ligula nec tincidunt. Mauris elit justo, sodales sed
        tellus quis, pulvinar ullamcorper est. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; In vitae
        porttitor risus. Donec quis lorem enim. Curabitur elementum venenatis
        nulla. Aenean eget imperdiet nibh. Phasellus mollis sit amet nulla et
        malesuada. Sed a enim diam. Aliquam eget sapien nec mauris pretium
        fringilla. Pellentesque convallis non ex eu bibendum. Sed ac tristique
        lacus. Mauris et suscipit eros. Nam pulvinar enim et interdum sagittis.
        Nulla consequat efficitur odio, a semper dolor. Morbi hendrerit dolor at
        leo viverra, a gravida purus egestas. Aliquam libero arcu, viverra
        eleifend tortor sit amet, blandit pulvinar ante. Integer justo metus,
        lobortis ut eros sed, dapibus cursus eros. In a rutrum mauris.
        Pellentesque mattis sapien mi, in consectetur nisi vestibulum in. Nulla
        tincidunt ornare nulla sit amet cursus. Etiam volutpat est et suscipit
        imperdiet. Duis commodo felis ante, sit amet varius eros interdum
        fringilla. Fusce ornare dui ut ullamcorper hendrerit. Quisque vehicula,
        eros sed scelerisque viverra, nibh ipsum consequat neque, in semper
        massa neque sit amet orci. Ut congue sapien eros, sed consectetur felis
        volutpat vitae. Nullam condimentum orci commodo nisi faucibus, at cursus
        magna cursus. Etiam lacinia tellus quis nisi vulputate porttitor. Duis a
        tincidunt enim. Donec in malesuada augue. Donec at eros ut dolor mattis
        tristique. Phasellus non fermentum velit, eu aliquam ex. Vestibulum
        suscipit dui sed lacinia dictum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat
        ornare, feugiat dui non, molestie augue. Nullam sollicitudin iaculis
        massa eget dapibus. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Etiam a finibus lacus, convallis iaculis urna. Maecenas at
        luctus velit. Suspendisse condimentum tempor risus, nec eleifend neque
        tincidunt in. Mauris ut sodales turpis. Nam ultrices varius orci. Proin
        dui nibh, aliquet ut feugiat vel, tincidunt quis nisl. Duis fermentum,
        metus nec molestie vulputate, nunc purus dignissim velit, eu mattis
        massa justo congue purus. Cras egestas id leo quis vehicula. Quisque at
        odio elementum nulla hendrerit scelerisque. Vivamus rutrum nisl nec
        lectus facilisis iaculis. Etiam dignissim commodo sagittis. Ut eleifend
        varius tempor. Donec erat ligula, gravida ac porttitor et, feugiat nec
        elit. Etiam dignissim odio ac sapien mattis, ut dignissim quam
        pellentesque. Aenean pharetra tortor et leo placerat, eu imperdiet justo
        pellentesque. Nunc blandit ex erat, ac elementum orci malesuada commodo.
        Morbi pellentesque ex quis dolor tempor, a mattis augue eleifend. Fusce
        aliquet odio et libero laoreet, vel aliquam neque lacinia. Duis sit amet
        hendrerit enim, ac porta elit. Vestibulum vel semper nunc. Phasellus
        dapibus tempus ligula nec tincidunt. Mauris elit justo, sodales sed
        tellus quis, pulvinar ullamcorper est. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; In vitae
        porttitor risus. Donec quis lorem enim. Curabitur elementum venenatis
        nulla. Aenean eget imperdiet nibh. Phasellus mollis sit amet nulla et
        malesuada. Sed a enim diam. Aliquam eget sapien nec mauris pretium
        fringilla. Pellentesque convallis non ex eu bibendum. Sed ac tristique
        lacus. Mauris et suscipit eros. Nam pulvinar enim et interdum sagittis.
        Nulla consequat efficitur odio, a semper dolor. Morbi hendrerit dolor at
        leo viverra, a gravida purus egestas. Aliquam libero arcu, viverra
        eleifend tortor sit amet, blandit pulvinar ante. Integer justo metus,
        lobortis ut eros sed, dapibus cursus eros. In a rutrum mauris.
        Pellentesque mattis sapien mi, in consectetur nisi vestibulum in. Nulla
        tincidunt ornare nulla sit amet cursus. Etiam volutpat est et suscipit
        imperdiet. Duis commodo felis ante, sit amet varius eros interdum
        fringilla. Fusce ornare dui ut ullamcorper hendrerit. Quisque vehicula,
        eros sed scelerisque viverra, nibh ipsum consequat neque, in semper
        massa neque sit amet orci. Ut congue sapien eros, sed consectetur felis
        volutpat vitae. Nullam condimentum orci commodo nisi faucibus, at cursus
        magna cursus. Etiam lacinia tellus quis nisi vulputate porttitor. Duis a
        tincidunt enim. Donec in malesuada augue. Donec at eros ut dolor mattis
        tristique. Phasellus non fermentum velit, eu aliquam ex. Vestibulum
        suscipit dui sed lacinia dictum.
      </p>
      <img
        style={{ transform: 'rotate(45deg)' }}
        src="https://i.kym-cdn.com/entries/icons/mobile/000/018/012/this_is_fine.jpg"
      />
    </div>
  )
}
