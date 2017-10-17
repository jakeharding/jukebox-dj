from channels import route_class

from .consumers import EventConsumer, RequesterConsumer

channel_routing = [
    EventConsumer.as_route(path=r"^/events/(?P<uuid>\w{8}-\w{4}-\w{4}-\w{4}-\w{12})$"),
    EventConsumer.as_route(path=r"^/events/(?P<uuid>\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/requester/(?P<session>\w+)$"),
]
