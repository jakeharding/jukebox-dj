from channels import route, route_class
from .consumers import EventConsumer

channel_routing = [
    route_class(EventConsumer, path=r"^/events/(?P<uuid>+\w{8}-\w{4}-\w{"
                                    r"4}-\w{4}-\w{12})$"),
    route_class(EventConsumer, path=r"^/events/(?P<uuid>+\w{8}-\w{4}-\w{"
                                    r"4}-\w{4}-\w{12}/requester/(?P<session>+\w)$")

]