from config import logs_chat
# from datetime import datetime

# import atexit
# import os
# import uuid
# import consul
# import socket

# from opentelemetry import trace
# from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
# from opentelemetry.instrumentation.flask import FlaskInstrumentor
# from opentelemetry.instrumentation.logging import LoggingInstrumentor
# from opentelemetry.instrumentation.requests import RequestsInstrumentor
# from opentelemetry.sdk.resources import SERVICE_NAME, Resource
# from opentelemetry.sdk.trace import TracerProvider
# from opentelemetry.sdk.trace.export import BatchSpanProcessor


# def setup():
#   try:
#     # Create a Consul client object
#     consul_client = consul.Consul(
#         os.environ.get('CONSUL_HOST'),
#         os.environ.get('CONSUL_PORT'))

#     SERVICE_ID = str(uuid.uuid4())+ " fork: " + str(os.getpid())
#     # Register service with Consul
#     service_definition = {
#         "name": "User Bot Service",
#         "service_id": SERVICE_ID,
#         "address": socket.gethostbyname(socket.gethostname()),
#         "port": 8000,
#         'check': {
#             'http': f'http://{socket.gethostbyname(socket.gethostname())}:8000/health',
#             'interval': '15s',
#             'timeout': '1m',
#         },
#     }
#     print(service_definition)
#     consul_client.agent.service.register(**service_definition)

#     def deregister():
#         consul_client.agent.service.deregister(service_id=SERVICE_ID)

#     atexit.register(
#         deregister
#     )


#     # Register with jaeger
#     FlaskInstrumentor().instrument()
#     LoggingInstrumentor().instrument()
#     RequestsInstrumentor().instrument()



#     jaeger_exporter = f"http://{os.environ.get('JAEGER_HOST')}:{os.environ.get('JAEGER_PORT')}/v1/traces"

#     print(jaeger_exporter)

#     trace.set_tracer_provider(TracerProvider(
#         resource=Resource.create({
#             SERVICE_NAME: "User Bot Service"
#     })
#     ))
#     span_processor = BatchSpanProcessor(OTLPSpanExporter(endpoint=jaeger_exporter))
#     trace.get_tracer_provider().add_span_processor(span_processor)
#   except Exception as e:
#      print(e)


def log(client,message,error = ''):
  client.send_message(logs_chat,str(error) + '\n' + str(message))
  # return
  # tracer = trace.get_tracer(__name__)
  # span = tracer.start_span("log")
  # # Your logic for the separate operation
  # span.add_event(message)
  # if not error:
  #   span.add_event("Success")
  # else:
  #     span.record_exception(error)
  # span.end()