FROM ruby:3.4

RUN apt-get update -qq && apt-get install -y nodejs build-essential

WORKDIR /app

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--watch", "--force_polling"]
