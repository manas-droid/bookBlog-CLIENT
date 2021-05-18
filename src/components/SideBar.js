import React , {useState , useRef} from 'react'
import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Ref,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const SidebarExampleTarget = () => {
  const segmentRef = useRef()
  const [visible, setVisible] = useState(true)

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment.Group} raised>
          <Sidebar
            as={Menu}
            animation='push'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            target={segmentRef}
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>Home</Menu.Item>
            <Menu.Item as='a'>Games</Menu.Item>
            <Menu.Item as='a'>Channels</Menu.Item>
          </Sidebar>

          <Ref innerRef={segmentRef}>
            <Segment secondary>
              <Header as='h3'>Clickable area</Header>
              <p>When you will click there, the sidebar will be closed.</p>
            </Segment>
          </Ref>

          
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  )
}

export default SidebarExampleTarget
